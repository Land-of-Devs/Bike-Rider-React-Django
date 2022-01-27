from rest_framework import permissions


class IsMaintenance(permissions.BasePermission):
    message = 'You don\'t have maintenance permissions'

    def has_permission(self, request, view):
        return (request.user and request.user.is_authenticated
                and request.user.role == 'MAINTENANCE')


class IsSupport(permissions.BasePermission):
    message = 'You don\'t have support permissions'

    def has_permission(self, request, view):
        return (request.user and request.user.is_authenticated
                and request.user.role == 'SUPPORT')


class IsAdmin(permissions.BasePermission):
    message = 'You don\'t have admin permissions'

    def has_permission(self, request, view):
        return (request.user and request.user.is_authenticated
                and request.user.role == 'ADMIN')


class IsPanelStaff(permissions.BasePermission):
    message = 'You don\'t have staff permissions'

    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class IsSuperAdmin(permissions.BasePermission):
    message = 'You don\'t have admin permissions'

    def has_permission(self, request, view):
        return (request.user and request.user.is_authenticated
                and request.user.is_superuser)


class IsOwnerOrAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, slug=None):

        if(request.user.is_staff or request.user.is_superuser):
            return True

        try:
            bar_id = request.user.worker.referenceWorker.filter(
                slug=slug).values_list('id', flat=True)[0]
            checkType = Work.objects.filter(
                worker_id=request.user.worker.id, bar_id=bar_id, isBoss=True).values_list('worker_id', flat=True)[0]
        except:
            return False

        return True


class IsWorkerInBar(permissions.BasePermission):

    def has_object_permission(self, request, view, bar=None):

        try:
            idBars = request.user.worker.referenceWorker.all().values_list('id', flat=True)
            return bar.id in idBars
        except:
            return False
